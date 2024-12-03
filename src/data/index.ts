import {exit} from 'node:process'
import db from '../config/db'

const clearDB = async () =>{
    try {
        await db.sync({ force: true })
        console.log('Base de datos limpia')
        exit(0)
    } catch (error) {
        console.error('Error al limpiar la base de datos', error)
        exit(1)
    }
 
}
if (process.argv[2]=== '--clear'){
    clearDB()
}
