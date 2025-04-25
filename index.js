import { Telegraf } from "telegraf";
import "dotenv/config";

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

const userStates = {};

  bot.start(ctx => {
    const userId = ctx.from.id;
    userStates[userId] = { step: 1, data: [] };
    ctx.reply("Ism va familiyangizni kiriting (Shodibek Karimov)");
  });

  bot.on("text", async ctx => {
    const userId = ctx.from.id;
    const text = ctx.message.text;

    if (!userStates[userId]) {
      userStates[userId] = { step: 1, data: [] };
      return ctx.reply("Iltimos, /start buyrug‘ini bosing.");
    }

    const user = userStates[userId];

    if (user.step === 1) {
      user.data.push(text);
      user.step++;
      ctx.reply("Yashash manzilingizni kiriting:");
    } else if (user.step === 2) {
      user.data.push(text);
      user.step++;
      ctx.reply("Yoshingizni kiriting:");
    } else if (user.step === 3) { 
      user.data.push(text);
      user.step++;
      ctx.reply("Ma'lumotingizni kiriting:");
    } else if (user.step === 4) {
      user.data.push(text);
      user.step++;
      ctx.reply(
        `
  Ism : ${user.data[0]}
  Viloyat : ${user.data[1]}
  Yosh : ${user.data[2]}
  Ma'lumot : ${user.data[3]}
      `, {
        reply_markup: {
          inline_keyboard: [[{ text: "Tasdiqlash", callback_data: "agree" }, { text: "Tahrirlash", callback_data: "edit" }]],
        }
      })

    } else {
      ctx.reply("Siz allaqachon barcha ma'lumotlarni yubordingiz.");
    }
  });


bot.on("callback_query", async ctx => {
  const res = ctx.update.callback_query.data
  if (res === "agree") {
    ctx.answerCbQuery()
    ctx.reply("Raxmat ma'lumotlaringiz qoshildi!")
  } else if (res === "edit") {
  } else {
    console.log(res)
  }


})




bot.launch({ dropPendingUpdates: true });