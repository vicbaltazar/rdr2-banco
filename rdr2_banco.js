const { Low } = require('lowdb')
const { JSONFile } = require('lowdb/node')

const file = './rdr2-personagens.json'
const adapter = new JSONFile(file)
const db = new Low(adapter, { gangue: { van_der_linde: [] } })

async function main() {
    await db.read()
    
    // Arthur Morgan (Create)
    db.data.gangue.van_der_linde.push({ 
        id: 1,
        nome: "Arthur Morgan",
        idade: 36,
        sexo: "masculino",
        personalidade: "leal, corajoso, complexo",
        historia: "Protagonista leal da gangue Van der Linde, moral complexa.",
        habilidades: ["olho da morte", "natação", "tiro preciso", "sobrevivência"],
        fraquezas: ["drogas", "saúde", "conflitos internos"]
    })
    await db.write()
    
    console.log('=== BANCO RDR2 ===')
    console.log('Gangue completa:', db.data.gangue.van_der_linde)
    
    // John Marston (Create/Update)
    db.data.gangue.van_der_linde.push({
        id: 3,
        nome: "John Marston",
        idade: 38,
        sexo: "masculino",
        personalidade: "determinado, leal",
        historia: "Ex-membro buscando redenção familiar.",
        habilidades: ["tiro", "equitação", "combate"],
        fraquezas: ["impulsividade", "passado"]
    })
    await db.write()
    
    // Filter protagonistas
    const protagonistas = db.data.gangue.van_der_linde.filter(p => 
        p.personalidade.includes('leal')
    )
    console.log('Protagonistas leais:', protagonistas)
    
    // Update Arthur (tuberculose)
    const arthur = db.data.gangue.van_der_linde.find(p => p.id === 1)
    if (arthur) {
        arthur.fraquezas.push('tuberculose')
        await db.write()
        console.log('Arthur evoluiu:', arthur.fraquezas)
    }
    
    // Delete John (id 3)
    db.data.gangue.van_der_linde = db.data.gangue.van_der_linde.filter(p => p.id !== 3)
    await db.write()
    
    console.log('Gangue final:', db.data.gangue.van_der_linde)
    console.log('✅ Dados salvos em rdr2-personagens.json!')
}

main().catch(err => console.error('Erro:', err))
