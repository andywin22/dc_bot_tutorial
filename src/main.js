import { Client, Events, GatewayIntentBits }from 'discord.js'
import dotenv from 'dotenv'
import { useAppStore } from '@/store/app'
import vueIn from '@/core/vue'
import {loadCommands,loadEvent} from '@/core/loader'

vueIn()
dotenv.config()
loadCommands()


const client = new Client({ intents: [GatewayIntentBits.Guilds]})
const appStrore = useAppStore()
appStrore.client = client

loadEvent()

client.login(process.env.TOKEN)