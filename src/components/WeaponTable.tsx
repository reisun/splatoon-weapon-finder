import type { Weapon } from "../types/weapon";

interface WeaponTableProps {
  weapons: Weapon[];
}

export function WeaponTable({ weapons }: WeaponTableProps) {
  if (weapons.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-8 text-center text-gray-500">
        条件に一致する武器が見つかりませんでした
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
              武器名
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
              武器種
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
              サブ
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
              スペシャル
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
              射程
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {weapons.map((weapon) => (
            <tr key={weapon.name} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-sm font-medium whitespace-nowrap text-gray-900">
                {weapon.name}
              </td>
              <td className="px-4 py-3 text-sm whitespace-nowrap text-gray-600">
                {weapon.class}
              </td>
              <td className="px-4 py-3 text-sm whitespace-nowrap text-gray-600">
                {weapon.sub}
              </td>
              <td className="px-4 py-3 text-sm whitespace-nowrap text-gray-600">
                {weapon.special}
              </td>
              <td className="px-4 py-3 text-sm whitespace-nowrap text-gray-600">
                {weapon.range}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
