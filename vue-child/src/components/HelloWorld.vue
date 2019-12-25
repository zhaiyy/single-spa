<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <a-button type="primary">Primary</a-button>
    <a-button>Default</a-button>
    <a-button type="dashed">Dashed</a-button>
    <a-button type="danger">Danger</a-button>
    <a-config-provider :autoInsertSpaceInButton="false">
      <a-button type="primary">按钮</a-button>
    </a-config-provider>
    <a-button type="primary">按钮</a-button>
    <a-button type="link">Link</a-button>
     <a-date-picker @change="onChange" />
    <br />
    <a-month-picker @change="onChange" placeholder="Select month" />
    <br />
    <a-range-picker @change="onChange" />
    <br />
    <a-week-picker @change="onChange" placeholder="Select week" />
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }, 
  methods: {
      onChange() {
      },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
