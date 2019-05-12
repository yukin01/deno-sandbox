// import {} from 'https://deno.land/std@v0.3.2/http/server'

const { open, copy, stdout } = Deno;

(async () => {
  const src = await open('example.txt');
  await copy(stdout, src);
})();