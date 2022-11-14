// const juan = {
//   name: "Juanito",
//   age: 18,
//   approvedCourses: ["Curso 1"],
//   addCourse(newCourse) {
//     console.log("this: ", this);
//     console.log("this.approvedCourses: ", this.approvedCourses);
//     this.approvedCourses.push(newCourse);
//   },
// };

// console.log(Object.keys(juan));
// console.log(Object.getOwnPropertyNames(juan));
// console.log(Object.entries(juan));

// Object.defineProperty(juan, "navigator", {
//   value: "Chrome",
//   enumerable: false,
//   writable: true,
//   configurable: true,
// });
// Object.defineProperty(juan, "editor", {
//   value: "VSCode",
//   enumerable: true,
//   writable: false,
//   configurable: true,
// });
// Object.defineProperty(juan, "terminal", {
//   value: "WSL",
//   enumerable: true,
//   writable: true,
//   configurable: false,
// });
// Object.defineProperty(juan, "pruebaNASA", {
//   value: "extraterrestre",
//   enumerable: false,
//   writable: false,
//   configurable: false,
// });

// Object.seal(juan);
// Object.freeze(juan);

// console.log(Object.getOwnPropertyDescriptors(juan));

// const obj1 = {
//   a: "a",
//   b: "b",
//   c: {
//     d: "d",
//     e: "e",
//   },
//   editA() {
//     this.a = "AAAAAA";
//   },
// };

// const stringifiedComplexObj = JSON.stringify(obj1);
// const obj2 = JSON.parse(stringifiedComplexObj);
// for (prop in obj1) {
//   obj2[prop] = obj1[prop];
// }

// const obj3 = Object.assign({}, obj1);
// const obj4 = Object.create(obj1);

function isObject(subject) {
  return typeof subject === "object";
}

function isArray(subject) {
  return Array.isArray(subject);
}

function deepCopy(subject) {
  let copySubject;

  const subjectIsObject = isObject(subject);
  const subjectIsArray = isArray(subject);

  if (subjectIsArray) {
    copySubject = [];
  } else if (subjectIsObject) {
    copySubject = {};
  } else {
    return subject;
  }

  for (const key in subject) {
    const keyIsObject = isObject(subject[key]);

    if (keyIsObject) {
      copySubject[key] = deepCopy(subject[key]);
    } else {
      if (subjectIsArray) {
        copySubject.push(subject[key]);
      } else {
        copySubject[key] = subject[key];
      }
    }
  }

  return copySubject;
}

function SuperObject() {}

SuperObject.isObject = function (subject) {
  return typeof subject === "object";
};

SuperObject.deepCopy = function (subject) {
  let copySubject;

  const subjectIsObject = isObject(subject);
  const subjectIsArray = isArray(subject);

  if (subjectIsArray) {
    copySubject = [];
  } else if (subjectIsObject) {
    copySubject = {};
  } else {
    return subject;
  }

  for (const key in subject) {
    const keyIsObject = isObject(subject[key]);

    if (keyIsObject) {
      copySubject[key] = deepCopy(subject[key]);
    } else {
      if (subjectIsArray) {
        copySubject.push(subject[key]);
      } else {
        copySubject[key] = subject[key];
      }
    }
  }

  return copySubject;
};

// class SuperObject {
//   static isObject(subject) {
//     return typeof subject === "object";
//   }

//   static deepCopy(subject) {
//     let copySubject;

//     const subjectIsObject = isObject(subject);
//     const subjectIsArray = isArray(subject);

//     if (subjectIsArray) {
//       copySubject = [];
//     } else if (subjectIsObject) {
//       copySubject = {};
//     } else {
//       return subject;
//     }

//     for (const key in subject) {
//       const keyIsObject = isObject(subject[key]);

//       if (keyIsObject) {
//         copySubject[key] = deepCopy(subject[key]);
//       } else {
//         if (subjectIsArray) {
//           copySubject.push(subject[key]);
//         } else {
//           copySubject[key] = subject[key];
//         }
//       }
//     }

//     return copySubject;
//   }
// }

// const studentBase = {
//   name: undefined,
//   email: undefined,
//   age: undefined,
//   approvedCourses: undefined,
//   learningPaths: undefined,
//   socialMedia: {
//     twitter: undefined,
//     instagram: undefined,
//     facebook: undefined,
//   },
// };

// const juan = deepCopy(studentBase);
// Object.seal(juan);
// Object.isSealed(juan);
// juan.name = "Juanito";
// Object.defineProperty(juan, "name", {
//   value: "Juanito",
//   configurable: false,
// });

function requiredParam(param) {
  throw new Error(param + " es obligatorio");
}

function LearningPath({ name = requiredParam("name"), courses = [] }) {
  this.name = name;
  this.courses = courses;

  // const private = {
  //   _name: name,
  //   _courses: courses,
  // };

  // const public = {
  //   get name() {
  //     return private["_name"];
  //   },
  //   set name(newName) {
  //     if (newName.length != 0) {
  //       private["_name"] = newName;
  //     } else {
  //       console.warn("Tu nombre debe tener al menos 1 caracter");
  //     }
  //   },
  //   get courses() {
  //     return private["_courses"];
  //   },
  // };

  // return public;
}

function Student({
  name = requiredParam("name"),
  email = requiredParam("email"),
  age,
  twitter,
  instagram,
  facebook,
  approvedCourses = [],
  learningPaths = [],
} = {}) {
  this.name = name;
  this.email = email;
  this.age = age;
  this.approvedCourses = approvedCourses;
  this.socialMedia = {
    twitter,
    instagram,
    facebook,
  };

  const private = {
    _learningPaths: [],
  };

  Object.defineProperty(this, "learningPaths", {
    get() {
      return private["_learningPaths"];
    },
    set(newLP) {
      // console.log(learningPaths[learningPathIndex]);
      // console.log(learningPaths[learningPathIndex] instanceof LearningPath);

      if (newLP instanceof LearningPath) {
        // console.warn("learningPath no es un verdadero LearningPath");
        // return;
        private["_learningPaths"].push(newLP);
      } else {
        console.warn(
          "Algunos de los LPs no es una instancia del prototipo LearningPath"
        );
      }
    },
  });

  // if (isArray(learningPaths)) {
  //   this._learningPaths = [];
  // console.warn("learningPaths no es un array");
  // return;
  for (const learningPath of learningPaths) {
    this.learningPaths = learningPath;
  }
  // }

  // const private = {
  //   _name: name,
  //   _learningPaths: learningPaths,
  // };
  // const public = {
  //   email,
  //   age,
  //   approvedCourses,
  //   socialMedia: {
  //     twitter,
  //     instagram,
  //     facebook,
  //   },
  //   get name() {
  //     return private["_name"];
  //   },
  //   set name(newName) {
  //     if (newName.length != 0) {
  //       private["_name"] = newName;
  //     } else {
  //       console.warn("Tu nombre debe tener al menos 1 caracter");
  //     }
  //   },
  //   get learningPaths() {
  //     return private["_learningPaths"];
  //   },
  //   set learningPaths(newLP) {
  //     if (!newLP.name) {
  //       console.warn("Tu LP no tiene la propiedad name");
  //       return;
  //     }
  //     if (!newLP.courses) {
  //       console.warn("Tu LP no tiene courses");
  //       return;
  //     }
  //     if (!isArray(newLP.courses)) {
  //       console.warn("Tu LP no es una lista (*de cursos)");
  //       return;
  //     }
  //     private["_learningPaths"].push(newLP);
  //   },
  //   // readName() {
  //   //   return private["_name"];
  //   // },
  //   // changeName(newName) {
  //   //   private["_name"] = newName;
  //   // },
  // };
  // Object.defineProperty(public, "readName", {
  //   writable: false,
  //   configurable: false,
  // });
  // Object.defineProperty(public, "changeName", {
  //   writable: false,
  //   configurable: false,
  // });
  // return public;
}

// Student.prototype.learningPaths = function

const escuelaWeb = new LearningPath({ name: "Escuela de WebDev" });
const escuelaData = new LearningPath({ name: "Escuela de Data Science" });
const juan = new Student({
  email: "juanito@frijoles.co",
  name: "Juanito",
  learningPaths: [escuelaWeb, escuelaData],
});

// const numeritos = [0, 1, 2, 3, 4, 5, 5, 6, 7, 8, 9, 435678, 7, 2, 3];
// let numerito = 0;
// for (let index = 0; index < numeritos.length; index++) {
//   numerito = numeritos[index];
//   console.log({ index, numerito });
// }

// function recursiva(numbersArray) {
//   if (numbersArray.length !== 0) {
//     const firstNum = numbersArray[0];
//     console.log(firstNum);
//     numbersArray.shift();
//     recursiva(numbersArray);
//   }
// }

// const juan = {
//   name: "Juanito",
//   approvedCourses: ["Curso 1", "Curso 2"],
//   caracteristicas: {
//     age: 18,
//     colorCabello: "Negro",
//     gustos: {
//       musica: ["rock", "punk", "ska"],
//       peliculas: ["drama", "horros", "comedia"],
//     },
//   },
//   addCourse(newCourse) {
//     console.log("This", this);
//     console.log("This.approvedCourses", this.approvedCourses);
//     this.approvedCourses.push(newCourse);
//   },
// };

// function deepFreeze(obj) {
//   // Tu código aquí 👈
//   for (const key in obj) {
//     const keyIsObject = typeof obj[key] === "object";

//     if (keyIsObject) {
//       deepFreeze(obj[key]);
//     }
//   }

//   return Object.freeze(obj);
// }

// function deepFreeze(obj) {
//   Object.keys(obj).forEach((prop) => {
//     if (typeof obj[prop] === "object") deepFreeze(obj[prop]);
//   });
//   return Object.freeze(obj);
// }
