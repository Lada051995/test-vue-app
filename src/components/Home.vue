<template>
  <div>
    <n-data-table
      v-if="profilesLoaded"
      :data="profileRows"
      :columns="columns"
    />
    <div v-else>Loading profiles...</div>
  </div>
</template>

<script>
import { onMounted, ref, watch } from "vue";
import { loadProfiles } from "@/database";
import { NDataTable } from "naive-ui";

export default {
  name: "HomePage",
  components: {
    NDataTable,
  },
  setup() {
    const profiles = ref([]);
    const profilesLoaded = ref(false);
    const columns = [
      { title: "First Name", key: "firstName" },
      { title: "Last Name", key: "lastName" },
      { title: "Age", key: "age" },
    ];
    const profileRows = ref([]);

    onMounted(async () => {
      try {
        profiles.value = await loadProfiles();
        profilesLoaded.value = true;
      } catch (error) {
        console.error("Failed to load profiles:", error);
      }
    });

    watch(profiles, (newProfiles) => {
      profileRows.value = newProfiles.map((profile) => ({
        firstName: profile.firstName,
        lastName: profile.lastName,
        age: profile.age,
      }));
    });

    return {
      profiles,
      columns,
      profileRows,
      profilesLoaded,
    };
  },
};
</script>
