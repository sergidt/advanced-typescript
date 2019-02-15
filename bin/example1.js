var EmployeeRepository = (function () {
    function EmployeeRepository() {
        this.employees = [
            { id: 1, name: "John" },
            { id: 2, name: "Jane", supervisorId: 1 },
            { id: 3, name: "Joe", supervisorId: 2 },
        ];
    }
    EmployeeRepository.prototype.findById = function (id) {
        var results = this.employees.filter(function (employee) { return employee.id === id; });
        return results.length ? results[0] : null;
    };
    return EmployeeRepository;
}());
var employeeIdInputEl = document.getElementById("employeeIdInput");
var findEmployeeButtonEl = document.getElementById("findEmployeeButton");
var searchResultsEl = document.getElementById("searchResults");
var repository = new EmployeeRepository();
findEmployeeButtonEl.addEventListener("click", function () {
    var supervisorName = getSupervisorName(employeeIdInputEl.value);
    if (supervisorName) {
        searchResultsEl.innerText = "Supervisor name: " + supervisorName;
    }
    else {
        searchResultsEl.innerText = "Could not find supervisor for given id";
    }
});
function getSupervisorName(enteredId) {
    if (enteredId) {
        var employee = repository.findById(parseInt(enteredId));
        if (employee && employee.supervisorId) {
            var supervisor = repository.findById(employee.supervisorId);
            if (supervisor) {
                return supervisor.name;
            }
        }
    }
}
