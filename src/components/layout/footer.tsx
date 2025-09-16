export default function Footer() {
  return (
    <div className="w-full h-16 flex items-center pt-3 border-t justify-between px-4 md:px-16 lg:px-40 mb-8">
      <div className="flex flex-col gap-2 text-sm">
        <p>
          <span className="text-gray-600">Холбоо барих:</span>{" "}
          infocab21.zakhzeel@gmail.com
        </p>
        <p>
          <span className="text-gray-600">Хаяг:</span> 1711 Keybridge way
          Bloomington IL 61704
        </p>
      </div>
      <p className="text-sm text-gray-600">@ copyright</p>
    </div>
  );
}
