Formulários (Template Driven)

Construir os campos dos formulários e associar aos valores dos objetos e como submeter esses valores.

Criar uma variável local: #nomedavariável

```jsx
<form #f="ngForm"> // associar ela a diretiva para que o Angular ajude a gerenciar
```

Não esquecer de importar o FormsModule.

Quando clicarmos no botão de submit, usamos o evento ngSubmit:

```jsx
<form #f="ngForm" (ngSubmit)="onSubmit(f)"> //f dentro faz referência a esse form
```

No component.ts criamos o método onSubmit.

```jsx
export class TemplateFormComponent implements OnInit {

  onSubmit(form: any){
    console.log(form);
  }
```

Para associar cada campo de input do nosso formulário com os valores do ngForm, colocamos uma propriedade name do campo e o ngModel

```jsx
<div class="form-group">
    <label for="nome">Nome</label>
    <input type="text" class="form-control" name="nome" id="nome" placeholder="Nome" ngModel>
  </div>
  <div class="form-group">
    <label for="email">E-mail</label>
    <input type="text" class="form-control" name="email" id="email" placeholder="nome@email.com" ngModel>
  </div>
```
