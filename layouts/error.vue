<template>
  <div>
    <section class="page_404">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 ">
            <div class="col-sm-10 col-sm-offset-1  text-center">
              <div class="four_zero_four_bg">
                <h1 v-if="error.statusCode === 404" class='text-center'>404</h1>
                <h1 v-else>An error occurred - {{ error.statusCode }} </h1>
              </div>
              <div class="contant_box_404">
                <h3 class="h2">Ooooh no ! Tu es perdu </h3>
                <p>La page que tu cherches n'existe pas</p>
                <NuxtLink to="/" class='link_404'>Retourner sur le dashboard</NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
/*======================
    404 page
=======================*/

.page_404{
  background:#fff;
  margin: auto;
  width: 50%;
  padding: 10px;
  font-family: "Roboto", sans-serif;
}

.page_404  img{ width:100%;}

.four_zero_four_bg{
  background-image: url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif);
  height: 400px;
  background-position: center;
}

.four_zero_four_bg h1{
  font-size:80px;
}

.four_zero_four_bg h3{
  font-size:80px;
}

.link_404{
  text-decoration: none;
  color: #fff!important;
  padding: 10px 20px;
  background: #39ac31;
  margin: 20px 0;
  display: inline-block;
}

.contant_box_404{
  margin-top:-50px;
}
</style>

<script>
export default {
  props: ['error'],
  layout: 'error' // you can set a custom layout for the error page
}
</script>
