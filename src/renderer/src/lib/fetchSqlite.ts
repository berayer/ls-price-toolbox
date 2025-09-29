export async function fetchSqlite<T = any>(key: ApiKey) {
  console.log(`Web Fetch 【SQLITE::${key}】`)
  return window.electron.ipcRenderer.invoke(`SQLITE::${key}`) as Promise<T>
}
