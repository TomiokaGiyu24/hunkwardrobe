const WA_NUMBER = import.meta.env.VITE_WA_NUMBER || '9319494399';

export function buildOrderMessage({ player, edition, size, price, customer }) {
  let msg = `Hi Hunk Wardrobe! 👋\n\n` +
    `I'd like to order:\n` +
    `🏀 *${player}* Jersey\n` +
    `✨ Edition: ${edition}\n` +
    `📏 Size: ${size}\n` +
    `💰 Price: ₹${price.toLocaleString('en-IN')}\n\n`;

  if (customer) {
    msg += `🚚 *SHIPPING DETAILS*\n` +
           `👤 Name: ${customer.name}\n` +
           `📞 Phone: ${customer.phone}\n` +
           `✉️ Email: ${customer.email || 'N/A'}\n` +
           `🏠 Address: ${customer.houseNo}, ${customer.landmark ? customer.landmark + ', ' : ''}${customer.city}, ${customer.state} - ${customer.pincode}\n\n`;
  }

  msg += `Please confirm availability and delivery details. Thank you!`;
  return encodeURIComponent(msg);
}

export function buildQuickOrderMessage({ player, edition }) {
  return encodeURIComponent(
    `Hi Hunk Wardrobe! 👋\n\n` +
    `I'm interested in the *${player}* ${edition} jersey.\n` +
    `Could you share availability and pricing? Thanks!`
  );
}

export function buildQuestionMessage({ player }) {
  return encodeURIComponent(
    `Hi Hunk Wardrobe! 👋\n\n` +
    `I have a question about the *${player}* jersey.\n`
  );
}

export function openWhatsApp(message) {
  window.open(`https://wa.me/${WA_NUMBER}?text=${message}`, '_blank');
}

export function openWhatsAppGeneral() {
  const message = encodeURIComponent(
    `Hi Hunk Wardrobe! 👋\n\nI'd like to browse your jersey collection. What's available?`
  );
  window.open(`https://wa.me/${WA_NUMBER}?text=${message}`, '_blank');
}
