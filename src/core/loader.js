import {Collection, REST,Routes } from 'discord.js'
import fg from 'fast-glob'
import{useAppStore} from '@/store/app'
const updateSlashCommands = async(commands) => {                                
    const rest = new REST({version:10}).setToken(process.env.TOKEN)
    
    const result = rest.put(
        Routes.applicationGuildCommands(
            process.env.APPID,
            '1070295268949495858'
            ),
    {
        body:commands
    }
    )
    console.log(result)
}

export const loadCommands  = async () =>{
    const appStrore = useAppStore()
    const actions = new Collection()
    const commands = []
    const files = await fg('./src/commands/**/index.js')    // 尋找command所有資料夾並有index.js
    
    for(const file of files){
       const cmd = await import(file)
       commands.push(cmd.command)
       actions.set(cmd.command.name,cmd.action)
    }
    await updateSlashCommands(commands)
    appStrore.commandsActionMap = actions

    console.log(appStrore.commandsActionMap)
}

export const loadEvent = async() =>{   
    const appStrore = useAppStore()
    const files = await fg('./src/event/**/index.js')
    const client = appStrore.client
    for(const file of files){
        const eventfile = await import(file)
       
        if(eventfile.event.once){
        client.once(eventfile.event.name,eventfile.action)
        }else{
        client.on(eventfile.event.name,eventfile.action)
        }
    }
}