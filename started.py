# from aiogram.utils import executor
import logging
from aiogram import Bot
from aiogram import Dispatcher
from aiogram.fsm.storage.memory import MemoryStorage


logging.basicConfig(level=logging.INFO)

bot = Bot(token='6323930950:AAEipDRJLbCuIRmZqq0HNlatXAJGlsgNac8')
# storage = MemoryStorage()
dp = Dispatcher()



async def on_startup(_):
	print('Бот вышел в онлайн')
	await bot.send_message(1030874842, 'Online')



if __name__ == '__main__':
    dp.start_polling(dp, skip_updates = True)

