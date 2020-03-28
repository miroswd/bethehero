const generateUniqueId = require('../utils/generateUniqueId')
const connection = require('../database/connection')


module.exports = {
  async index(req,res) {
    const ongs = await connection('ongs').select('*'); // todos os registros na tabela ongs;
    return res.json(ongs)
  },

  async create(req,res){
    const { name, email, whatsapp, city, uf } = req.body;
    
    const id = generateUniqueId();
    
    // Quando o node chegar nessa parte, irá aguardar, para depois continuar
    await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf
    })

    return res.json({id})

  }
}