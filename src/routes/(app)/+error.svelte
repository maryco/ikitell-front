<script>
  import { page } from '$app/stores'
</script>

<h1>{$page.status}: {$page.error?.message}</h1>
<ul>
  <li><a href="/">Top</a></li>
  <li><a href="/login">Login</a></li>
</ul>
