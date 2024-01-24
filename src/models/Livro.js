import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

const livroSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  titulo: {
    type: String,
    required: [true, "O título do livro é obrigatório"]
  },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "autores",
    required: [true, "O autor é obrigatório"],
    autopopulate: { select: "nome" }
  },
  editora: {
    type: String,
    required: [true, "A editora é obrigatório"],
    enum: {
      values: ["Clássicos", "Fantasia"],
      message: ["A editora {VALUE} fornecida não é um valor permitido"]
    }
  },
  preco: { type: Number },
  paginas: {
    type: Number,
    //min: [10, "O numero de paginas deve estar dentro de 10-5000. Valor fornecido: {VALUE}"],
    //max: [5000, "O numero de paginas deve estar dentro de 10-5000. Valor fornecido: {VALUE}"]
    validator: {
      validator: (valor) => {
        return valor >= 10 && valor <= 5000;
      },
      message: "O numero de paginas deve estar dentro de 10-5000. Valor fornecido: {VALUE}"
    }
  },
}, { versionKey: false });

livroSchema.plugin(autopopulate);
const livros = mongoose.model("livros", livroSchema);

export default livros;