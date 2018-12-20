"use strict";

const base_url = "http://192.168.3.1:8080/";

function buildUrl (myinput) {
    return base_url + myinput;
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

Vue.component('news-list', {
  props: ['results'],
  template: `
    <section>
      <div class="row" v-for="posts in processedPosts">
        <div class="columns large-3 medium-6" v-for="post in posts">
          <div class="card">
          <div class="card-divider">
          {{ post.title }}
          </div>
          <a :href="post.url" target="_blank"><img :src="post.image_url"></a>
          <div class="card-section">
            <p>{{ post.abstract }}</p>
          </div>
        </div>
        </div>
      </div>
  </section>
  `,
  computed: {
    processedPosts() {
      let posts = this.results;
      // Add image_url attribute
      posts.map(post => {
        post.image_url = "http://placehold.it/300x200?text=N/A";
      });

      // Put Array into Chunks
      let i, j, chunkedArray = [], chunk = 4;
      for (i=0, j=0; i < posts.length; i += chunk, j++) {
        chunkedArray[j] = posts.slice(i,i+chunk);
      }
      return chunkedArray;
    }
  }
});

const vm = new Vue({
  el: '#app',
  data: {
    results: [],
    myinput: null,
	loading: true,
    title: ''
  },
  mounted () {
    //this.getPosts('home');
  },
  methods: {
    async getPosts(myinput) {
		while(this.results.complete != 'True') {
		console.log(myinput);
      let url = buildUrl(myinput);
      axios.get(url).then((response) => {
        this.loading = false;
        this.results = response.data.results;
        let title = "Results";
      }).catch((error) => { console.log(error); });
		await sleep(1000);
		}
		}
  }
});
