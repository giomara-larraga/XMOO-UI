<script>
    import { goto } from '$app/navigation';
    import { page, navigating } from '$app/stores';
    import '../app.postcss';
    let selectedRoute = '';
  
    /**
	 * @param {{ preventDefault: () => void; }} event
	 */
    function handleSelection(event) {
      event.preventDefault();
      if (selectedRoute) {
        goto(selectedRoute);
      }
    }
  </script>
  
  <style>
    /* You can add any additional custom styles here if needed */
  </style>
  
  <div class="flex flex-col items-center justify-center h-screen bg-gray-100">
    <h1 class="text-4xl font-bold mb-6">Choose Your Route</h1>
    <form class="space-y-4" on:submit={handleSelection}>
      <select class="form-select block w-64 p-2.5 text-lg border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" bind:value={selectedRoute} required>
        <option value="" disabled>Select a route</option>
        <option value="/lime">Lime</option>
        <option value="/shap">Shape</option>
      </select>
      <button type="submit" class="btn btn-primary w-32 py-2 text-white bg-blue-500 rounded-md shadow-sm hover:bg-blue-600 focus:ring-4 focus:ring-blue-300">
        Go
      </button>
    </form>
  </div>
  