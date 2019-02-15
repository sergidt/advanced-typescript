interface Employee {
    id: number;
    name: string;
    supervisorId?: number;
}

class EmployeeRepository {
    private employees: Employee[] = [
        { id: 1, name: "John" },
        { id: 2, name: "Jane", supervisorId: 1 },
        { id: 3, name: "Joe", supervisorId: 2 },
    ];

    findById(id: number) {
        const results = this.employees.filter(employee => employee.id === id);
        return results.length ? results[0] : null;
    }
}

const employeeIdInputEl = document.getElementById("employeeIdInput") as HTMLInputElement;
const findEmployeeButtonEl = document.getElementById("findEmployeeButton");
const searchResultsEl = document.getElementById("searchResults");

const repository = new EmployeeRepository();

findEmployeeButtonEl.addEventListener("click", () => {
    const supervisorName = getSupervisorName(employeeIdInputEl.value);
    if (supervisorName) {
        searchResultsEl.innerText = `Supervisor name: ${supervisorName}`;
    } else {
        searchResultsEl.innerText = "Could not find supervisor for given id";
    }
});

function getSupervisorName(enteredId: string) {
    if (enteredId) {
        const employee = repository.findById(parseInt(enteredId));
        if (employee && employee.supervisorId) {
            const supervisor = repository.findById(employee.supervisorId);
            if (supervisor) {
                return supervisor.name;
            }
        }
    }
}

