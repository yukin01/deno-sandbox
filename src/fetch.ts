const { open, copy } = Deno;

(async () => {
  const f = await open("etc/denoland.html", "w+");
  const res = await fetch("https://deno.land");
  await copy(f, res.body);
  f.close();
})();
