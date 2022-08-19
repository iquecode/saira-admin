

import { User, UserOrder } from '@prisma/client';
import { networkInterfaces } from 'os';
import { ParsedUrlQueryInput } from 'querystring';
import { isPromise } from 'util/types';
import { UserNormalized } from '../../../../model/User';
import { normalizedUser } from '../../auth/lib/normalizedUser';
import { client } from '../../lib/prisma/client';
import { generateMessageToSendMail, sendMail } from '../../lib/util';

// export async function updateUserWithDataForm(id:string, data:any)   {
//         const {linkedin, github, instagram, facebook, whatsapp, telegram, alternativeEmail,
//                cityId, stateId, countryId, documentTypeId,   
//              ...dataUserFromForm} = data;
//         let dataToUpdate = {...dataUserFromForm, 
//                               country: { connect: {id:parseInt(countryId)}},
//                               documentType: { connect: {id:parseInt(documentTypeId)}}
//                             }
//         if(countryId==33) { //Brasil
//           dataToUpdate = {...dataToUpdate, city:{ connect: {id: parseInt(cityId)}} }
//         }
                              
//         const userUpdate = await client.user.update({
//             where: {
//                 id,
//             },
//             data: dataToUpdate,
//         });
//         if(!userUpdate) {
//             throw new Error("Erro ao realizar update dos dados do usuário na base de dados.");
//         }
//         let contacts = [];
//         if (!!linkedin)  contacts.push({name: 'LinkedIn', value: linkedin, userId: id });
//         if (!!alternativeEmail) contacts.push({name: 'Email alternativo', value: alternativeEmail, userId: id  });
//         if (!!github)    contacts.push({name: 'GitHub',       value: github, userId: id  });
//         if (!!instagram) contacts.push({name: 'Instagram',    value: instagram, userId: id  });
//         if (!!facebook)  contacts.push({name: 'Facebook',     value: facebook, userId: id  });
//         if (!!whatsapp)  contacts.push({name: 'Whatsapp',     value: whatsapp, userId: id  });
//         if (!!telegram)  contacts.push({name: 'Telegram',     value: telegram, userId: id  });
        
//         if(contacts.length > 0) {
//           contacts.forEach( async (item) => {
//             const newContactUser = await client.contact.upsert({
//                      where: {
//                       unique_contact_user: {name: item.name, userId: id},
//                      },
//                      update : {
//                       value: item.value,
//                      },
//                      create: {
//                        name: item.name,
//                        value: item.value,
//                        userId: id
//                      }
//             });
//           })
//         }
        
//         // if (contacts.length > 0) {
//         //   const newContactsUser = await client.contact.createMany({
//         //       data: contacts, 
//         //   });
//         // }
//         return userUpdate;
// }


export async function createUserOrderAssociate(user: User, ip: string, dispositive: string)   {
    const newUserOrderAssociate = await client.userOrder.create({
        data: {
          userId: user.id,
          typeUserOrderId: 'associate',
          status: 'created',  //created, pendency, denied, under_debate, accept     
          DataUserOrder: {
            create: [
              {name: 'ip', value: ip},
              {name: 'dispositive', value: dispositive},
            ]
          }
        },
      })
      if(!newUserOrderAssociate) {
        throw new Error("Erro ao realizar criação do pedido de associação na base de dados.");
      }
      let template = await generateMessageToSendMail('order-associate-apply.html');
      template = template.replace('{ID}', newUserOrderAssociate.id);
      const dataOrder = await getDataOrderAssociate(newUserOrderAssociate, ip, dispositive);
      template = template.replace('{DADOS}', dataOrder );
      const template2 = '<h1>NOVO PEDIDO DE ASSOCIAÇÃO PELO SISTEMA:</h1><br/><br/>' + template;
      const emailSended = await sendMail('mailer@institutosaira.org',user.email,
                'Instituto Saíra - seu pedido de associação foi recebido :)', template );
      const emailSended2 = await sendMail('mailer@institutosaira.org','institutosaira@gmail.com',
      'Instituto Saíra - novo pedido de associação', template2 );
      return newUserOrderAssociate.id;
}


export async function getAssociateOrders(skip=0, take=10) {
  const [associateOrders, total] = await client.$transaction([
    client.userOrder.findMany({
      skip,
      take,
      where: {
        typeUserOrderId:'associate',
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
        type: true,
        DataUserOrder: true,
      }
    }),
    client.userOrder.count({
      where: {
        typeUserOrderId:'associate',
      }
    })
  ])
  
  return {associateOrders: normalizeAssociateOrders(associateOrders), total};
}

function normalizeAssociateOrders(associateOrders) {
  const normalized = associateOrders.map((order) => {
    return {id: order.id, name:order.user.name, email: order.user.email, status: order.status, createdAt: order.createdAt};
  })
  return normalized;
}

async function getDataApprovedAssociate(order: UserOrder, ip: string, dispositive: string, userIdFromOrder: string, userIdApprove: string) {
  
  const [userFromOrder, userApprove] = await client.$transaction([
    client.user.findUnique({
      where: {
        id: userIdFromOrder,
      },
      select: {
        id: true,
        email: true,
        name: true,
      }
    }),
    client.user.findUnique({
      where: {
        id: userIdApprove,
      },
      select: {
        id: true,
        email: true,
        name: true,
      }
    })
  ]); 

  let data = '<pre>';
  data +=    'Momento da aprovação......: ' + order.createdAt + '<br/>'; 
  data +=    'Usuário aprovador.........: ' + userApprove.email + ' | ' + userApprove.name + ' | Id: ' + userApprove.id + '<br/>';
  data +=    'IP da aprovação...........: ' + ip  + '<br/>';
  data +=    'Dispositivo da aprovação..: ' + dispositive  + '<br/><br/>';
  data +=    '-------------------------------------------- <br/>'
  data +=    'Usuário aprovado como nova pessoa associada:<br/>'
  data +=    '-------------------------------------------- <br/>'
  data +=    'e-mail / ID.......: ' + userFromOrder.email + ' | Id: ' + userFromOrder.id + '<br/>';
  data +=    'Nome..............: ' + userFromOrder.name + '<br/>';
  
  return {data, email: userFromOrder.email};
}

async function getDataOrderAssociate(order: UserOrder, ip: string, dispositive: string) {

  const user = await client.user.findUnique({
    where: {
      id: order.userId,
    },
    include: {
      circles: true,
      roles: true,
      orders: {
        include: {
          DataUserOrder: true,
        }
      },
      documentType: true,
      city: {
        include: {
          state: true,
        }
      }
    }
  });

  let data = '<pre>';
  data += 'Momento da solicitação....: ' + order.createdAt + '<br/>'; 
  data +=    'Usuário solicitante.......: ' + user.email + '<br/>';
  data +=    'IP da solicitação.........: ' + ip  + '<br/>';
  data +=    'Dispositivo da solicitação: ' + dispositive  + '<br/>';
  data +=    '-------------------------------------------- <br/><br/>'
  data +=    'Dados cadastrais enviados:<br/>'
  data +=    '-------------------------------------------- <br/>'
  data +=    'Nome..............: ' + user.name + '<br/>';
  data +=    'CPF...............: ' + user.cpf + '<br/>';
  data +=    'Doc. identificação: ' + user.documentType.name + ' ' + user.documentNumber +  '<br/>';
  data +=    'Ocupação..........: ' + user.occupation + '<br/>';
  data +=    'Endereço..........: ' + user.addressLine1 + ' ' + user.addressLine2 + ' ' + user.city.name + ' ' + user.city.state.uf + '<br/>';
  data +=    'Filiação..........: ' + user.motherName + ' | ' + user.fatherName + '<br/>';
  data +=    'Data nascimento...: ' + user.birthDate + '<br/>';
  
  return data;
}


export async function ConfirmAssociateOrder(userIdFromOrder: string, userId: string, orderId: string, detectedIp: string, dispositive: string) {

  const userSignIn = await client.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      type: true,
      name: true,
      email: true,
    }
  });

  const type = userSignIn.type;

  if (type != 'admin' && type != 'mananger' && type != 'cg' ){
    return {error: 'usuário sem autorização para manutenção de dados.'};
  }


  const [order, user] = await client.$transaction([
    client.userOrder.update({
      where: {
        id: orderId,
      },
      data: {
        status: 'approved',
        DataUserOrder: {
          create: [
            {name: 'approved-user-id', value: userId},
            {name: 'approved-date', value: Date.now().toString()},
            {name: 'approved-ip', value: detectedIp},
            {name: 'approved-dispositive', value: dispositive},
          ]
        }
      }
    }),
    client.user.update({
      where: {
        id: userIdFromOrder,
      },
      data: {
        type: 'member',
        associated: true,
        circles: {
          connect: [
            {id: 'ag'},
          ]
        }
      }
    })
  ]);


  let template = await generateMessageToSendMail('order-associate-approved.html');
  template = template.replace('{ID}', order.id);
  const {data, email} = await getDataApprovedAssociate(order, detectedIp, dispositive, userIdFromOrder, userId);
  template = template.replace('{DADOS}', data );
  const template2 = '<h1>APROVAÇÃO DE NOVA ASSOCIAÇÃO:</h1><br/><br/>' + template;
  const emailSended = await sendMail('mailer@institutosaira.org',email,
            'Instituto Saíra - seu pedido de associação foi APROVADO :)', template );
  const emailSended2 = await sendMail('mailer@institutosaira.org','institutosaira@gmail.com',
  'Instituto Saíra - pedido de associação APROVADO', template2 );


  // const order = await client.userOrder.update({
  //   where: {
  //     id: orderId,
  //   },
  //   data: {
  //     status: 'approved',
  //     DataUserOrder: {
  //       create: [
  //         {name: 'approved-user-id', value: userId},
  //         {name: 'approved-date', value: Date.now().toString()},
  //         {name: 'approved-ip', value: detectedIp},
  //         {name: 'approved-dispositive', value: dispositive},
  //       ]
  //     }
  //   }
  // });

  // const user = await client.user.update({
  //   where: {
  //     id: userIdFromOrder,
  //   },
  //   data: {
  //     type: 'member',
  //     associated: true,
  //     circles: {
  //       connect: [
  //         {id: 'ag'},
  //       ]
  //     }
  //   }
  // });

  return {success: true, order, user};


}


export async function getOrder(Orderid: string, userIdSignIn: string) {
  const userSignIn = await client.user.findUnique({
    where: {
      id: userIdSignIn,
    },
    select: {
      type: true,
      name: true,
      email: true,
    }
  });

  const type = userSignIn.type;

  if (type != 'admin' && type != 'mananger' && type != 'cg' ){
     return {sucess: false, error: 'usuário sem autorização para manutenção de dados.'};
  }
  const order = await client.userOrder.findUnique({
    where: {
      id: Orderid,
    }
  })

  return {sucess: true, order};

} 
