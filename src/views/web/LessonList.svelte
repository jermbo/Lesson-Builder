<script>
  import { createEventDispatcher } from "svelte";
  import { Button } from "sveltestrap";
  const dispatch = createEventDispatcher();
  export let lessons = [];

  function deleteLesson(lesson) {
    dispatch("deleted", lesson);
  }

  function selectLesson(lesson) {
    dispatch("selected", lesson);
  }
</script>

{#each lessons as { id, title, difficulty }, i (id)}
  <div
    dataId={id}
    class="lesson bg-light p-3 d-flex justify-content-center align-items-center
    border-bottom">
    <p class="m-0">
      {title}
      <small>{difficulty}</small>
    </p>
    <div class="actions d-flex ml-auto">
      <Button
        color="primary"
        size="sm"
        class="mr-2"
        on:click={selectLesson(lessons[i])}>
        Edit
      </Button>
      <Button
        color="danger"
        size="sm"
        class="mr-2"
        on:click={deleteLesson(lessons[i])}>
        Delete
      </Button>
    </div>
  </div>
{/each}
