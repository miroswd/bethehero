const connection = require("../database/connection")

module.exports = {

  async index(req,res){
    // limite de listagem
    const {page=1} = req.query;
    // http://localhost:3333/incidents?page=3

    const [count] = await connection('incidents')
    .count() // [count] == count[0]
    
    res.header('X-Total-Count', count['count(*)'])
    console.log(count)

    const incidents = await connection('incidents')
    .join('ongs','ongs.id','=','incidents.ong_id')
    .limit(5)
    .offset((page - 1) * 5) // Quando pular de página
    .select([
      'incidents.*', 
      'ongs.name',
      'ongs.email',
      'ongs.whatsapp',
      'ongs.city',
      'ongs.uf'
  
  ]);

    return res.json(incidents)
  },
  
  async create(req,res){
    const { title, description, value } = req.body;

    // id buscado através da autenticação
    const ong_id = req.headers.authorization;

    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ong_id
    })

    return res.json({id})
  }, 

  async delete(req,res){
    const {id} = req.params;
    const ong_id = req.headers.authorization; 

    // verificar se o caso foi realmente criado pela ONG
    const incident = await connection('incidents')
      .where('id',id)
      .select('ong_id')
      .first();

      if (incident.ong_id != ong_id){
        return res.status(401).json({error: "Operation not permitted"})

      }
    
    await connection('incidents').where('id',id).delete();

    return res.status(204).send();
  }
}