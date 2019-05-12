class UpcaseReader implements Deno.Reader {
  constructor(private readonly reader: Deno.Reader) {}

  async read(p: Uint8Array): Promise<Deno.ReadResult> {
    const { nread, eof } = await this.reader.read(p);
    for (let i = 0; i < p.length; i++) {
      if (p[i] >= 97 && p[i] <= 122) {
        p[i] -= 32;
      }
    }
    return { nread, eof };
  }
}

export async function main() {
  const listener = Deno.listen("tcp", "127.0.0.1:8888");
  const conn: Deno.Conn = await listener.accept();
  await Deno.copy(conn, new UpcaseReader(conn));
  conn.close();
}

main();
