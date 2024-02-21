const provinces = [
  { name: 'Alberta', code: 'AB' },
  { name: 'British Columbia', code: 'BC' },
  { name: 'Manitoba', code: 'MB' },
  { name: 'New Brunswick', code: 'NB' },
  { name: 'Newfoundland and Labrador', code: 'NL' },
  { name: 'Northwest Territories', code: 'NT' },
  { name: 'Nova Scotia', code: 'NS' },
  { name: 'Nunavut', code: 'NU' },
  { name: 'Ontario', code: 'ON' },
  { name: 'Prince Edward Island', code: 'PE' },
  { name: 'Quebec', code: 'QC' },
  { name: 'Saskatchewan', code: 'SK' },
  { name: 'Yukon', code: 'YT' }
];

export function getProvinceCode(name: string | undefined): string | undefined {
  if (!name) return '';
  const province = provinces.find((province) => province.name.toLowerCase() === name.toLowerCase());
  return province?.code;
}

export default provinces;
