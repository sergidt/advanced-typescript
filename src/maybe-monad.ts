interface Employee {
    id: number;
    name: string;
    supervisorId: Maybe<number>;
}

class EmployeeRepository {
    private employees: Employee[] = [
        { id: 1, name: "John" , supervisorId: Maybe.none()},
        { id: 2, name: "Jane", supervisorId: Maybe.fromValue(1) },
        { id: 3, name: "Joe", supervisorId: Maybe.fromValue(2) },
    ];

    findById(id: number): Maybe<Employee> {
        debugger;
        const results = this.employees.filter(employee => employee.id === id);
        return results.length ? Maybe.some(results[0]) : Maybe.none();
    }
}

class Maybe<T> {
    private constructor(private value: T | null) {}

    static some<T>(value: T) {
        if (!value) {
            throw Error("Provided value must not be empty");
        }
        return new Maybe(value);
    }

    static none<T>() {
        return new Maybe<T>(null);
    }

    static fromValue<T>(value: T) {
        return value ? Maybe.some(value) : Maybe.none<T>();
    }

    map<R>(f: (wrapped: T) => R): Maybe<R> {
        if (this.value === null) {
            return Maybe.none<R>();
        } else {
            return Maybe.some(f(this.value));
        }
    }

    flatMap<R>(f: (wrapped: T) => Maybe<R>): Maybe<R> {
        if (this.value === null) {
            return Maybe.none<R>();
        } else {
            return f(this.value);
        }
    }

    getOrElse(defaultValue: T) {
        return this.value === null ? defaultValue : this.value;
    }
}

const employeeIdInputEl = document.getElementById("employeeIdInput") as HTMLInputElement;
const findEmployeeButtonEl = document.getElementById("findEmployeeButton");
const searchResultsEl = document.getElementById("searchResults");

const repository = new EmployeeRepository();

findEmployeeButtonEl.addEventListener("click", () => {
    const supervisorName = getSupervisorName(Maybe.fromValue(employeeIdInputEl.value));
    searchResultsEl.innerText = `Supervisor name: ${supervisorName.getOrElse("could not find")}`;
});

function getSupervisorName(maybeEnteredId: Maybe<string>): Maybe<string> {
    return maybeEnteredId
        .flatMap(employeeIdString => Maybe.fromValue(parseInt(employeeIdString))) // parseInt can fail
        .flatMap(employeeId => repository.findById(employeeId))
        .flatMap(employee => employee.supervisorId)
        .flatMap((supervisorId: number) => repository.findById(supervisorId))
        .map(supervisor => supervisor.name);
}