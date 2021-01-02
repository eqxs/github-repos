<template>
  <div id="app">
    <qxs-table :data="repos" :columns="columns" />
  </div>
</template>

<script>
import QxsTable from 'components/Table'

export default {
  components: {
    QxsTable,
  },

  data: () => ({
    repos: [],
    page: 1,
    perPage: 20,

    columns: [
      {
        label: 'Name',
        value: 'name',
        width: '30%',
      },
      {
        label: 'Link',
        value: 'html_url',
        width: '30%',
      },
      {
        label: 'Owner',
        value: 'owner',
        width: '10%',
      },
      {
        label: 'Forks',
        value: 'forks',
        width: '10%',
        align: 'right',
      },
      {
        label: 'open issues',
        value: 'open_issues',
        width: '10%',
        align: 'right',
      },
      {
        label: 'Watchers',
        value: 'watchers',
        width: '10%',
        align: 'right',
      },
    ],
  }),
}
</script>

<style lang="scss" scoped>
#app {
  width: 100vw;
  height: 100vh;
  min-height: 300px;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  overflow: hidden;
}
</style>
