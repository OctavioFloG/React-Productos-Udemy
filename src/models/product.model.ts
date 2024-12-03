import { Table, Column, Model, DataType, Default } from 'sequelize-typescript'

@Table({
    tableName: 'products',
})

class Producto extends Model {
    @Column({
        type: DataType.FLOAT
    })
    declare name: string
    @Column({
        type: DataType.FLOAT(6,2)
    })
    declare price: number
    @Default(true)
    @Column({
        type: DataType.BOOLEAN
    })
    declare availability: boolean
}

export default Producto