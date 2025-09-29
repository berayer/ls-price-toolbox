import { app } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'
import Database from 'better-sqlite3'
import { existsSync, readFileSync } from 'node:fs'
import type { Database as DatabaseType } from 'better-sqlite3'

/**
 * 连接本地sqlite数据库
 * @returns Database
 */
function initializeDatabase(): DatabaseType {
  const DB_PATH = join(app.getPath('userData'), 'price-rule-data.db')
  console.log('sqlite path:', DB_PATH)
  const isNew = !existsSync(DB_PATH)
  const db = new Database(DB_PATH, { verbose: is.dev ? console.log : undefined })
  db.pragma('journal_mode = WAL')
  if (isNew) {
    console.log('🆕 数据库文件不存在，正在初始化...')
    // todo 生产环境路径应该有问题
    const SCHEMA_PATH = join(app.getAppPath(), 'resources/schema.sql')
    const DATA_PATH = join(app.getAppPath(), 'resources/data.sql')
    const schemaSQL = readFileSync(SCHEMA_PATH, 'utf8')
    db.exec(schemaSQL)
    const dataSQL = readFileSync(DATA_PATH, 'utf8')
    db.exec(dataSQL)
    console.log('✅ 数据库初始化完成！')
  }
  return db
}

const sqlite = initializeDatabase() as DatabaseType

/** 获取当前sqlite的版本号 */
export function findSqliteVersion() {
  const result = sqlite.prepare<[], { r: string }>(`select sqlite_version() as r`).get()
  return result?.r || 'unknown'
}

/** 获取所有的基材 */
export function findAllMat() {
  return sqlite.prepare<[], SQLITE.Mat>(`select * from mat;`).all()
}

/** 通过id查询基材 */
export function findMatById(id: number) {
  return sqlite.prepare<[number], SQLITE.Mat>(`select * from mat;`).get(id)
}

/** 获取所有的颜色 */
export function findAllColor() {
  return sqlite.prepare<[], SQLITE.Mat>(`select * from color;`).all()
}

/** 获取所有报价类型 */
export function findAllPriceType() {
  return sqlite.prepare<[], SQLITE.PriceType>(`select * from price_type;`).all()
}

/** 通过id查询颜色 */
export function findColorById(id: number) {
  return sqlite.prepare<[number], SQLITE.Mat>(`select * from color;`).get(id)
}

export function findMatColorPriceByMatColorId(matColorId: number) {
  return sqlite
    .prepare<[number], SQLITE.MatColorPrice>(`select * from mat_color_price where mat_color_id = ?;`)
    .all(matColorId)
}

export async function findMatColorDtoByMatId(matId: number) {
  const matColors = sqlite.prepare<[number], SQLITE.MatColor>(`select * from mat_color where mat_id = ?;`).all(matId)
  return covertMatColorDto(matColors)
}

function covertMatColorDto(data: SQLITE.MatColor[]) {
  const result: SQLITE.MatColorDto[] = []
  for (const matColor of data) {
    const prices = findMatColorPriceByMatColorId(matColor.id)
    result.push({
      ...matColor,
      prices,
    })
  }
  return result
}
