import 'dotenv/config';
import { MongoClient, ObjectId } from 'mongodb';

const client = new MongoClient(process.env.DATABASE_HUMANO_URL);
const database = client.db('alertas');
const collection = database.collection('humano2021');
await client.connect();

export async function findAll(pagina, alertasPorPagina) {
  try {
    let alertas = [];

    const alertasPagina = (pagina - 1) * alertasPorPagina;

    const cursor = collection
      .find()
      .sort({ dataHora: -1 })
      .limit(alertasPorPagina)
      .skip(alertasPagina);

    await cursor.forEach((alerta) => alertas.push(alerta));

    return alertas;
  } catch (e) {
    console.log(e);
  }
}

export async function findOne(id) {
  try {
    const alerta = await collection.findOne({ _id: ObjectId(id) });

    return alerta;
  } catch (e) {
    console.log(e);
  }
}
