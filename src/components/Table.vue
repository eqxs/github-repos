<template>
  <div class="qxs-table">
    <div class="qxs-table__head">
      <table>
        <thead>
          <tr class="qxs-table__row head">
            <th
              v-for="item in columns"
              :key="item.value"
              :class="{
                'qxs-table__cell': true,
                'align-right': item.align === 'right',
              }"
            >
              {{ item.label || item.value }}
            </th>
          </tr>
        </thead>
      </table>
    </div>
    <div class="qxs-table__body"></div>
  </div>
</template>

<script>
export default {
  props: {
    columns: {
      type: Array,
      required: true,
    },

    data: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="scss" scoped>
.qxs-table {
  position: relative;
  overflow: hidden;
  border-radius: 4px;

  table {
    width: 100%;
  }

  &__head {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    box-shadow: 0 5px 20px 0 $shadow;
  }

  &__row {
    padding: 10px 20px;
    box-sizing: border-box;

    &.head {
      height: 40px;
    }
  }
}
</style>
