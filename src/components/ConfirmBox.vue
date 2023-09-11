<script setup lang="ts">
import type { ColumnType } from '@/types';

defineProps<{ deletableTask: { colType: ColumnType, taskIndex: number } }>()
const emit = defineEmits(["cancel", "confirm"])

</script>
<template>
    <VCard>
        <VCardTitle>Confirm Delete</VCardTitle>
        <VCardText>Are you sure you want to delete this task?</VCardText>
        <VCardActions class="justify-end">
            <VBtn @click="emit('cancel')">Cancel</VBtn>
            <VBtn color="red" @click="emit('confirm')">
                Confirm
            </VBtn>
        </VCardActions>
    </VCard>
</template>