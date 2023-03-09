// const token = '5980815799:AAGnAWgcVzsefT-bRBUJNGIEba1CViiZAaU';

const TelegramBot = require('node-telegram-bot-api');

const token = '5980815799:AAGnAWgcVzsefT-bRBUJNGIEba1CViiZAaU';
const bot = new TelegramBot(token, { polling: true });

const chatIds = ['-883152730', '-962630357', '-941281904', '-890511930', '-944138102']; // Replace with your desired chat IDs

// Schedule messages
const schedule = [
    { hour: 17, minute: 30, text: 'Доброго дня. Будьласка зробіть замовлення на завтра:\nСосиска -\nГорох -\nКартопля -\nКапуста -\nБіляш -\nСулугуні -\nМисливська -' },
];

bot.onText((msg) => {
  console.log(msg.length)
  if (msg.length > 60) {
    const chatId = msg.chat.id;
    const resp = 'Дякую за замовлення';
    bot.sendMessage(chatId, resp);
  }
});

schedule.forEach(({ hour, minute, text }) => {
  const job = setInterval(() => {
    const now = new Date();
    if (now.getHours() === hour && now.getMinutes() === minute && now.getDay() !== 6) {
      chatIds.forEach((chatId) => {
        bot.sendMessage(chatId, text);
      });
    }
  }, 60000); // Check every minute
});


