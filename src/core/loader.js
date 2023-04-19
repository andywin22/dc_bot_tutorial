import {REST,Routes } from 'discord.js'
import fg from 'fast-glob'
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

    const commands = []
    const files = await fg('./src/commands/**/index.js')    // 尋找command所有資料夾並有index.js
    
    for(const file of files){
       const cmd = await import(file)
       commands.push(cmd.command)
    }
    await updateSlashCommands(commands)
}
