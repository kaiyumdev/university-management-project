import { Schema, model } from 'mongoose';
import { IStudent, StudentModel } from './student.interface';

export const StudentSchema = new Schema<IStudent, StudentModel>(
  {
    id: {
      type: 'String',
      required: true,
      unique: true,
    },
    name: {
      type: {
        firstName: {
          type: 'String',
          required: true,
        },
        middleName: {
          type: 'String',
        },
        lastName: {
          type: 'String',
          required: true,
        },
      },
    },
    dateOfBirth: {
      type: 'String',
    },
    gender: {
      type: 'String',
      enum: ['male', 'female'],
    },
    bloodGroup: {
      type: 'String',
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    email: {
      type: 'String',
      required: true,
      unique: true,
    },
    contactNo: {
      type: 'String',
      required: true,
      unique: true,
    },
    emergencyContactNo: {
      type: 'String',
      required: true,
      unique: true,
    },
    presentAddress: {
      type: 'String',
      required: true,
    },
    permanentAddress: {
      type: 'String',
      required: true,
    },
    guardian: {
      required: true,
      type: {
        fatherName: {
          type: 'String',
          required: true,
        },
        fatherOccupation: {
          type: 'String',
          required: true,
        },
        fatherContactNo: {
          type: 'String',
          required: true,
        },
        motherName: {
          type: 'String',
          required: true,
        },
        motherOccupation: {
          type: 'String',
          required: true,
        },
        motherContactNo: {
          type: 'String',
          required: true,
        },
      },
    },
    localGuardian: {
      required: true,
      type: {
        name: {
          type: 'string',
          required: true,
        },
        occupation: {
          type: 'string',
          required: true,
        },
        contactNo: {
          type: 'string',
          required: true,
        },
        address: {
          type: 'string',
          required: true,
        },
      },
    },
    profileImage: {
      type: 'string',
      required: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'academicFaculty',
      required: true,
    },

    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'academicDepartment',
      required: true,
    },
    academicSemester: {
      type: Schema.Types.ObjectId,
      ref: 'academicSemester',
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } },
);

export const Student = model<IStudent, StudentModel>('Student', StudentSchema);
