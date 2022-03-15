/*
 * Lifecycles - Order
 */

const newOrderEmail = {
    subject: 'PerformancePack Orderbekräftelse',
    text: `
        Grattis <%= order.firstname %>!

        Ditt ordernummer är: <%= order.id %>

        Du har beställt följande produkter:
        
        <%= order.basketText %>

        Total: <%= order.total %> kr

        Betalninsstatus: <%= order.status %>

        Swish nummer: 123 598 20 38

        Hälsningar PerformancePack
    `,
    html: `<h1>Grattis <%= order.firstname %>!</h1>
        <p>Ditt ordernummer är: <%= order.id %></p>

        <p>Du har beställt följande produkter:</p>

        <%= order.basketHTML %>

        <p>Total: <%= order.total %> kr</p>

        <p>Betalninsstatus: <%= order.status %></p>

        <p>Swish nummer: 123 598 20 38</>

        <p>Hälsningar PerformancePack</p>
    `,
};

const updateOrderEmail = {
    subject: 'Ändrad Status',
    text: `
        Ändrad Betalninsstatus

        Ditt ordernummer är: <%= order.id %>

        Du har beställt följande produkter:
        
        <%= order.basketText %>

        Total: <%= order.total %> kr

        Betalninsstatus: <%= order.status %>

        Hälsningar PerformancePack
    `,
    html: `<h1>Ändrad Betalningsstatus</h1>
        <p>Ditt ordernummer är: <%= order.id %></p>

        <p>Du har beställt följande produkter:</p>

        <%= order.basketHTML %>

        <p>Total: <%= order.total %> kr</p>

        <p>Betalninsstatus: <%= order.status %></p>

        <p>Hälsningar PerformancePack</p>
    `,
};

const sendMail = async (template, result) => {
    const { id } = result;

    const order = await strapi.entityService.findOne('api::order.order', id, {
        populate: { items: true },
    });

    const { firstname, lastname, email, total, paid, items } = order;

    const status = paid ? "Betalning verifierad." : "Din betalning inväntar verifering.";
    let basketHTML = ``;
    let basketText = ``;

    items.forEach(item => {
        const { name, quantity, price, subtotal } = item;

        basketHTML += `<p>${quantity}st ${name} @ ${price}/st = ${subtotal}kr</p>`;
        basketText += `${quantity}st ${name} @ ${price}/st = ${subtotal}kr\n`
    });

    await strapi.plugins['email'].services.email.sendTemplatedEmail(
        {
          to: email,
        },
        template,
        {
          order: {
              id,
              status,
              basketHTML,
              basketText,
              firstname,
              lastname,
              email,
              total
          },
        }
      );
};

module.exports = {
    async afterCreate({ result }) {
        await sendMail(newOrderEmail, result);
    },
    async afterUpdate({ result, params: { data } }) {
        await sendMail(updateOrderEmail, result);
    }
};