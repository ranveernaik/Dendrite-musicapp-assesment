
// data-flickity='{"wrapAround" :true ,"autoPlay" : 1500 }'
const Slidder = ()=>{
    return ( 
    

    <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active" data-bs-interval="4000">
    <img src={"m1.jpg"} style={{width: 100,height:657}} class="d-block w-100"></img>
    </div>
    <div class="carousel-item" data-bs-interval="4000">
    <img src={"m2.jpg"} style={{width: 100,height:657}} class="d-block w-100" ></img>
    </div>
    <div class="carousel-item" data-bs-interval="4000">
    <img src={"m3.jpg"} style={{width: 100,height:657}} class="d-block w-100" ></img>
    </div>
    <div class="carousel-item" data-bs-interval="4000">
    <img src={"m4.jpg"} style={{width: 100,height:657}} class="d-block w-100" ></img>
    </div>
    <div class="carousel-item" data-bs-interval="4000">
    <img src={"m5.jpg"} style={{width: 100,height:657}} class="d-block w-100" ></img>
    </div>
    
  </div>
  <div className="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
       <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
       <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
     <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="4" aria-label="Slide 5"></button>
        
    </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
    )
}


export default Slidder;