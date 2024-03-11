module.exports = {
    async createQuery (model, data) {
        const user = await model.create(data)
        user.password = undefined
        return user
    },
    async findAllQuery (model, options) {
        return await model.findAll({...options})
    },
    async findOneQuery (model, options) {
        return await model.findOne({...options})
    },
    async deleteQuery (model, options) {
        return await model.destroy({...options})
    },
    async updateQuery (model, data, options) {
        return await model.update({...data},{...options})
    }
}