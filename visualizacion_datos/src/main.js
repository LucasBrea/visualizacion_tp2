<script>
  import * as d3 from "d3"
  import {onMount} from "svelte"

  /* Array donde guardaremos la data */
  let alumnos = []

  /* 1. Escala para edades */
  let grosor = d3.scaleLinear().range([5, 20])

  /* 2. Escala para genero */

  let colorProductividad = d3
    .scaleOrdinal()
    .domain(["POSITIVA", "NEGATIVA"])
    .range(["#03c04a", "#d21404"])
  
  let colorContenido = d3
    .scaleOrdinal()
    .domain(["Series","Juegos","Videos","Peliculas","Libros","Musica"])

  /* 3. Escala para continentes */
  let colorPlataforma = d3
    .scaleOrdinal()
    .domain(["Spotify", "Youtube", "Netflix", "TikTok", "Twitter","Pinterest","Sigedu"])
    .range(["#9caf88", "#ff1f1f", "#870f10", "#a865b5", "#9bc7ec","990000","e2edeb"])

  /* 4. Escala para altura */
  let radioAltura = d3.scaleRadial()

  /* 5. Escala para medallas */
  let colorMedalla = d3.scaleOrdinal()
    .domain(["Oro", "Plata", "Bronce"])
    .range(["gold", "silver", "brown"])

  onMount(() => {
    d3.csv("./EncuestaVisualizacion.csv", d3.autoType).then(data => {
      console.log(data)

      /* Actualizamos dominio con la data de edad */
      let minMaxHoras = d3.extent(data, d => d.Tiempo)
      grosor = grosor.domain(minMaxHoras)

      /* Actualizamos dominio y rango con la data de altura */
      let minMaxAltura = d3.extent(data, d => d.altura)
      radioAltura = radioAltura.domain(minMaxHoras).range([25, 50])

      alumnos = data
    })
  })
</script>

<main>
  <div class="header">
    <img src="/images/olympics-logo.png" width="100" alt="anillos" />
    <h3 class="headline">
      <b>Triunfos Olímpicos</b>
      Medallas, alturas y continentes
    </h3>
    <p class="bajada">Explorando los logros olímpicos a través de datos</p>
  </div>

  <!-- Conedor de las entidades -->
  <div class="container">
    <!-- Iteramos la data para visualizar c/ entidad -->
    {#each alumnos as alumno}
      <div class="person-container">
        <div class="Productividad"
          style="background-color: {colorProductividad(alumno.Productividad)}"
          ></div>
        <div
          class="person"
          style="border-width: {grosor(alumno.Tiempo)}px; 
        background-color:{colorPlataforma(alumno.Plataforma)}; 
        width: {4 * radioAltura(alumno.Tiempo)}px; 
        height: {4 * radioAltura(alumno.Tiempo)}px; 
        border-color: {colorProductividad(alumno.Productividad)}"
        ></div>
        <p class="name">
          <b>{alumno.Nombre}</b>
          <br />
          {alumno.Contenido}
        </p>
      </div>
    {/each}
  </div>
</main>

<style>
  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 50px;
    margin-bottom: 80px;
  }
  .headline {
    font-size: 30px;
    line-height: 1.2;
    font-weight: normal;
    text-align: center;
    margin: 20px;
  }
  .bajada {
    font-size: 18px;
    font-weight: normal;
    text-align: center;
    margin: 10px;
  }
  .headline b {
    display: block;
  }
  .container {
    display: flex;
    justify-content: center;
    align-items: end;
    margin: auto;
    flex-wrap: wrap;
    max-width: 1000px;
    gap: 30px;
    margin-bottom: 100px;
  }
  .person-container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    flex: 180px 0 0;
  }
  .person {
    width: 100px;
    height: 100px;
    border: 10px solid black;
    border-radius: 50%;
    box-sizing: border-box;
    background-color: pink;
  }
  .Productividad {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: gold;
    margin: 5px 0;
  }
  .name {
    font-size: 14px;
    color: rgb(65, 65, 65);
    font-weight: normal;
    text-align: center;
    margin-top: 5px;
  }
</style>
