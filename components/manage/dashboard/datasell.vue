<template>
  <v-card>
    <v-app-bar flat>
      <v-toolbar-title class="subtitle-4 black--text pl-0">
        ใบเสร็จ - ของเดือน
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="text-center">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
              กรกฎาคม 2564
            </v-btn>
          </template>
          <v-list>
            <!-- <v-list-item v-for="(item, index) in items" :key="index">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item> -->
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>
    <v-simple-table height="270px">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              ชื่อใบเสร็จ
            </th>
            <th class="text-left">
              วันที่
            </th>
          </tr>
        </thead>
        <tbody>
          <!-- <tr v-for="item in desserts" :key="item.name">
            <td>{{ item.name }}</td>
            <td>{{ item.calories }}</td>
          </tr> -->
        </tbody>
      </template>
    </v-simple-table>
  </v-card>
</template>

<script>
export default {};
</script>

<style></style>
