import{SlashCommandBuilder} from 'discord.js'

export const command = new SlashCommandBuilder()
.setName('hello')
.setDescription('hello command')

export const action = async (act) =>{
act.reply('world!!!!!')}