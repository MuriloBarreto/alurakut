import { SiteClient } from 'datocms-client';

export default async function recebedorDeRequests(request, response) {
    if(request.method === 'POST') {
    const TOKEN = 'abcf341b936782c9a66c64f054612e';
    const client = new SiteClient(TOKEN);

    const registroCriado = await client.items.create({
        itemType: "968802", // ID do Model de "Communities" criado pelo Dato
        ...request.body,
        // title: "Comunidade de Teste",
        // imageUrl: "https://github.com/MuriloBarreto.png",
        // creatorSlug: "MuriloBarreto"
    })
    response.json({
        dados: 'Algum dado qualquer',
        registroCriado: registroCriado,
    })
    return;
    }

    response.status(404).json({
        message: 'Erro!!'
    })
}