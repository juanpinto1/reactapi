const evolutions = ()=>{}

const [pokemonId, setPokemonId] = useState(1);
const [pokemonEvolutions, setPokemonEvolutions] =useState([]);

useEffect(()=>{
getEvolutions(pokemonId);
}, [pokemonId]) // hace que solo se active una vez el useEffect //

async function getEvolutions(id){
const response = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}`)
const data= await response.json()

let pokemonEvoArray = []
let pokemonLv1 = data.chain.species.name;
let pokemonLv1Img = await getPokemonImgs(pokemonLv1)
pokemonEvoArray.push([pokemonLv1, pokemonLv1Img])

if(data.chain.evolves_to.length !== 0){
let pokemonLv2 = data.chain.evolves_to[0].species.name
let pokemonLv2Img = await getPokemonImgs(pokemonLv2)
pokemonEvoArray.push([pokemonLv2, pokemonLv2Img])

if(data.chain.evolves_to[0].evolves_to.length!==0){
let pokemonLv3 = data.chain.evolves_to[0].evolves_to[0].species.name
let pokemonLv3Img = await getPokemonImgs(pokemonLv3)
pokemonEvoArray.push([pokemonLv3, pokemonLv3Img])  
    
}
}
setPokemonEvolutions(pokemonEvoArray)
}

async function getPokemonImgs(name){
const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
const data = await response.json()  
return data.sprites.other["official-artwork"].front_default;
}
const PrevClick=() =>{  (pokemonId === 1)?
setPokemonId(1):
setPokemonId(pokemonId -1)
}
const Nexclick =()=>{
setPokemonId(pokemonId +1)
}