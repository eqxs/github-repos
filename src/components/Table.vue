<template>
  <div class="qxs-table">
    <div class="qxs-table__head">
      <table class="qxs-table__layout">
        <thead class="qxs-table__thead">
          <tr class="qxs-table__row head">
            <th
              v-for="(column, index) in columns"
              :key="'head' + column.value"
              :class="{
                'qxs-table__column': true,
                'align-right': column.align === 'right',
                head: true,
              }"
              :style="columnsStyle[index]"
            >
              <div class="qxs-table__cell">
                {{ column.label || column.value }}
              </div>
            </th>
          </tr>
        </thead>
      </table>
    </div>
    <div class="qxs-table__body">
      <table v-if="data.length > 0" class="qxs-table__layout">
        <tbody class="qxs-table__tbody">
          <tr v-for="(item, rowIndex) in data" :key="'row' + rowIndex" class="qxs-table__row">
            <td
              v-for="(column, index) in columns"
              :key="'body' + column.value"
              :class="{
                'qxs-table__column': true,
                'align-right': column.align === 'right',
              }"
              :style="columnsStyle[index]"
            >
              <div class="qxs-table__cell">
                <div class="qxs-table__cell-label">{{ column.label || column.value }}</div>
                <a
                  v-if="columns[index].link"
                  class="qxs-table__link"
                  :href="item[columns[index].value]"
                  target="_blank"
                  :title="item[columns[index].value]"
                  >{{ item[columns[index].value] }}</a
                >
                <span v-else>{{ item[columns[index].value] }}</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <infinite-loading :identifier="infiniteId" @infinite="infiniteHandler">
        <template #no-results>
          <div class="qxs-table__empty">No data</div>
        </template>
        <template #no-more>
          <div class="qxs-table__empty">No more data</div>
        </template>
        <template #error>
          <div class="qxs-table__error">
            <div>Failed to load</div>
            <button class="qxs-table__button" @click="reset">Reset</button>
          </div>
        </template>
      </infinite-loading>
    </div>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'

export default {
  components: {
    InfiniteLoading,
  },

  props: {
    columns: {
      type: Array,
      required: true,
    },

    data: {
      type: Array,
      default: () => [],
    },

    loading: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    infiniteId: +new Date(),
  }),

  computed: {
    columnsStyle() {
      return this.columns.map(({ width }) => ({ width }))
    },
  },

  methods: {
    infiniteHandler($state) {
      this.$emit('fetch', $state)
    },

    reset() {
      this.infiniteId = +new Date()
    },
  },
}
</script>

<style lang="scss" scoped>
$headHeight: 50px;
$maxHeight: 600px;
$cellPadding: 10px 15px;

.qxs-table {
  position: relative;
  border-radius: 4px;
  padding-top: $headHeight;
  box-sizing: border-box;
  border: 1px solid $colorDisabled;
  max-height: $maxHeight;
  box-shadow: 0 0 40px 0 $shadow;
  background: $white;

  @media screen and (max-width: 768px) {
    padding-top: 0;
  }

  &__layout {
    width: 100%;
    border-spacing: 0;
    border-collapse: collapse;
    table-layout: fixed;
  }

  &__head {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    box-shadow: 0 5px 20px 0 $shadow;
    min-height: $headHeight;
    max-height: $headHeight;
    background: $white;
    color: $colorPrimary;

    @media screen and (max-width: 768px) {
      display: none;
    }
  }

  &__row {
    box-sizing: border-box;
    background: $white;

    &:nth-child(even) {
      background: lighten($colorPrimary, 34%);
    }

    &.head {
      height: $headHeight;
      line-height: 20px;
      white-space: nowrap;
      background: $white;
    }

    &:not(.head) {
      border-bottom: 1px solid $colorDisabled;

      &:hover {
        background: lighten($colorPrimary, 30%);
      }

      &:last-child {
        border-bottom: none;
      }
    }
  }

  &__column {
    padding: 0;
    font-weight: $normal;
    text-align: left;

    &.head {
      font-weight: $bold;
    }

    @media screen and (min-width: 769px) {
      &.align-right {
        text-align: right;
      }
    }
  }

  &__cell {
    box-sizing: border-box;
    padding: $cellPadding;
    word-break: break-all;
    overflow: hidden;
  }

  @media screen and (max-width: 768px) {
    &__column:not(:first-child) &__cell {
      padding-top: 0;
    }
  }

  &__cell-label {
    display: none;
    text-transform: uppercase;
    font-size: 10px;
    font-weight: $bold;
    color: $colorPrimary;
    pointer-events: none;

    @media screen and (max-width: 768px) {
      display: block;
    }
  }

  &__body {
    width: 100%;
    overflow-y: auto;
    max-height: calc(#{$maxHeight} - 60px);
  }

  &__empty {
    text-align: center;
    color: $colorSecondary;
    padding: $cellPadding;
    box-sizing: border-box;
  }

  &__error {
    text-align: center;
    padding: $cellPadding;
    box-sizing: border-box;
    color: $colorError;

    .qxs-table__button {
      margin-top: 10px;
    }
  }

  &__empty,
  &__error {
    font-size: 14px;
  }

  &__link {
    text-decoration: none;
    color: $colorPrimary;
    font-weight: $bold;
    display: inline-block;

    &:hover {
      color: darken($colorPrimary, 10%);
    }
  }

  &__button {
    padding: 5px 10px;
    text-align: center;
    border: none;
    color: $colorPrimary;
    background: lighten($colorPrimary, 30%);
    cursor: pointer;
    border-radius: 4px;

    &:hover {
      background: lighten($colorPrimary, 20%);
    }
  }

  @media screen and (max-width: 768px) {
    &__layout,
    &__row,
    &__column,
    &__thead,
    &__tbody {
      display: block;
    }

    &__column {
      width: 100% !important;
    }
  }
}
</style>
