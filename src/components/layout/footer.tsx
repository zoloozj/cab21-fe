import Iconify from "../ui/iconify";

export default function Footer() {
  return (
    <div className="w-full h-max flex-col sm:flex-row sm:flex gap-3 items-center pt-3 border-t justify-between px-4 md:px-16 lg:px-40 mb-8">
      <div className="flex flex-col gap-2 text-sm">
        <p>
          <span className="text-gray-600">Холбоо барих: </span>{" "}
          <span className="text-nowrap">85151195</span>
        </p>
        <p>
          <span className="text-gray-600">И-Мэйл:</span>{" "}
          <span className="text-nowrap">infocab21.zakhzeel@gmail.com</span>
        </p>
        <p>
          <span className="text-gray-600">Хаяг:</span>
          <span className="text-nowrap">
            1711 Keybridge way Bloomington IL 61704
          </span>
        </p>
      </div>
      <p className="text-sm text-gray-600 w-max">@copyright</p>
    </div>
  );
}
