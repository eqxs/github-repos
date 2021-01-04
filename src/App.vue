<template>
  <div id="app">
    <div class="content">
      <qxs-table :data="formattedRepos" :columns="columns" :loading="loading" @fetch="fetch" />
    </div>
  </div>
</template>

<script>
import humanize from 'humanize'

import QxsTable from 'components/Table'

export default {
  components: {
    QxsTable,
  },

  data: () => ({
    loading: false,

    repos: [],
    page: 1,

    columns: [
      {
        label: 'Name',
        value: 'name',
        width: '20%',
      },
      {
        label: 'Link',
        value: 'html_url',
        width: '20%',
        link: true,
      },
      {
        label: 'Owner',
        value: 'owner',
        width: '15%',
      },
      {
        label: 'Forks',
        value: 'forks',
        width: '15%',
        align: 'right',
      },
      {
        label: 'Open issues',
        value: 'open_issues',
        width: '15%',
        align: 'right',
      },
      {
        label: 'Watchers',
        value: 'watchers',
        width: '15%',
        align: 'right',
      },
    ],
  }),

  computed: {
    formattedRepos() {
      return this.repos.map(({ name, html_url, owner, forks, open_issues, watchers }) => ({
        name,
        html_url,
        owner: owner.login,
        forks: humanize.numberFormat(forks, 0),
        open_issues: humanize.numberFormat(open_issues, 0),
        watchers: humanize.numberFormat(watchers, 0),
      }))
    },
  },

  methods: {
    async fetch($state) {
      try {
        this.loading = true

        const { data } = await this.$api.get('search/repositories', {
          params: {
            q: 'language:JavaScript',
            sort: 'stars',
            order: 'desc',
            per_page: 20,
            page: this.page,
          },
        })

        this.repos.push(...(data?.items ?? []))
        this.page++

        if (this.page > 50) $state.complete()
        else $state.loaded()
      } catch {
        $state.error()
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
$margin: 20px;

#app {
  width: calc(100vw - #{$margin * 2});
  min-height: calc(100vh - #{$margin * 2});
  margin: $margin;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  overflow: auto;

  .content {
    width: 100%;
    max-width: 1200px;
  }
}
</style>
