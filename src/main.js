import { Client, Events, GatewayIntentBits }from 'discord.js'
import dotenv from 'dotenv'
import vueIn from '@/core/vue'
import {loadCommands} from '@/core/loader'

loadCommands()
dotenv.config()
vueIn()


const client = new Client({ intents: [GatewayIntentBits.Guilds]})

client.once(Events.ClientReady, (c) => {
	console.log(`Ready! Logged in as ${c.user.tag}`)
})

client.login(process.env.TOKEN)