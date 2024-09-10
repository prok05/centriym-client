export function SelectRole() {
    return (
        <div className="flex-col justify-center">
            <p className="text-center m-0 mb-2">Выберите роль</p>
            <select className="w-full rounded-full p-2" name="role">
                <option value="student" selected>Ученик</option>
                <option value="teacher">Преподаватель</option>
                <option value="methodist">Методист</option>
            </select>
        </div>
    )
}