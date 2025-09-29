type ApiKey = keyof typeof import('../db/sqlite')

declare namespace SQLITE {
  interface BaseEntity {
    id: number
    created_at: string
    updated_at: string
  }

  interface Mat extends BaseEntity {
    name: string
    code: string
  }

  interface Color extends Mat {
    full_name: string
    d_code?: string
  }

  interface MatColor extends BaseEntity {
    mat_id: number
    color_id: number
    spec: number
    thick: number
  }

  interface PriceType extends BaseEntity {
    name: string
    unit: number
    remark: string
    priority: number
  }

  interface MatColorPrice extends BaseEntity {
    mat_color_id: number
    price_type_id: number
    price: number
  }

  interface MatColorDto extends MatColor {
    prices: MatColorPrice[]
  }
}
